import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ScanbotService } from '../services/scanbot-service.service';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { ImageFilterType, Page } from 'capacitor-plugin-scanbot-sdk/';
import { Camera } from '@capacitor/camera';

@Component({
	selector: 'app-document-results',
	templateUrl: './document-results.page.html',
	styleUrls: ['./document-results.page.scss'],
})
export class DocumentResultsPage implements OnInit {

	constructor(private scanbot: ScanbotService, private actionSheetController: ActionSheetController, private router: Router) {
		let data = this.router.getCurrentNavigation()?.extras?.state?.['pageIds']
		if (data) {
			this.pageIds = data;
			this.withData = true
		} else {
			this.pageIds = []
			this.withData = false
		}
		this.filterModalOpen = false
		this.filterNames = ["NONE", "COLOR_ENHANCED", "GRAYSCALE", "BINARIZED", "COLOR_DOCUMENT", "PURE_BINARIZED", "BACKGROUND_CLEAN", "BLACK_AND_WHITE", "OTSU_BINARIZATION", "DEEP_BINARIZATION", "LOW_LIGHT_BINARIZATION", "LOW_LIGHT_BINARIZATION_2", "EDGE_HIGHLIGHT", "SENSITIVE_BINARIZATION"]
	}

	images: string[] = []
	pageIds: string[]
	withData: boolean
	filterNames: string[]
	filterModalOpen: boolean

	selectedFilterMode?: string
	pageToFilter?: Page
	pageToFilterIndex?: number

	async reloadData() {
		if (!this.withData) {
			this.pageIds = (await this.scanbot.getStoredPageIds()).pageIds.reverse()
		}
		await this.loadImageThumbnails()
	}

	async ngOnInit() {
		await this.reloadData();
	}

	async loadImageThumbnails() {
		var uris = (await this.scanbot.getPagePreviewUris("DOCUMENT", this.pageIds)).uris.filter(uri => uri !== undefined).map(uri => uri!)
		this.images = uris.map(uri => Capacitor.convertFileSrc(uri))
	}

	async onFilterChanged(ev: any) {
		this.selectedFilterMode = ev.target.value
	}

	async setOpen(val: boolean) {
		this.filterModalOpen = val
	}

	async onDeleteAllClick() {
		const ids = (await this.scanbot.getStoredPageIds()).pageIds
		for (const pageId of ids) {
			const page = await this.scanbot.getPageById(pageId)
			await this.scanbot.removePage(page)
		}
		this.pageIds = []
		this.images = []
	}

	async onAddClick() {
		let res = await Camera.pickImages({})
		let photos = await Promise.all(res.photos.filter(async (photo) => { photo.path !== undefined; }).map(async (photo) => {
			const page = await this.scanbot.addPageFromImage(photo.path!);
			const documentPage = await this.scanbot.detectDocumentOnPage(page);
			return Capacitor.convertFileSrc(documentPage.documentPreviewImageFileUri ?? documentPage.originalImageFileUri);
		}))
		this.images = photos.concat(this.images)
		await this.reloadData();
	}

	async onFilterBtnPress() {
		if (this.pageToFilter !== undefined) {
			const page = await this.scanbot.applyImageFilterOnPage(this.pageToFilter, this.selectedFilterMode as ImageFilterType);
			const refreshed = await this.scanbot.refreshImages([page]);
			const uri = refreshed[0].documentPreviewImageFileUri ?? refreshed[0].originalPreviewImageFileUri;
			console.log(uri);
			this.images[this.pageToFilterIndex!] = Capacitor.convertFileSrc(uri)
		}
		this.filterModalOpen = false;
	}

	async showActionSheet(position: number) {
		let buttons = new Array<ActionSheetButton>()
		this.pageToFilter = await this.scanbot.getPageById(this.pageIds[position])

		buttons.push({
			text: 'Crop',
			role: 'crop',
			icon: 'crop',
			handler: async () => {
				if ((await this.scanbot.getLicenseInfo()).isLicenseValid) {
					const page = await this.scanbot.getPageById(this.pageIds[position])
					let result = (await this.scanbot.showCropUi(page))
					if (result.status === "OK") {
						this.images[position] = Capacitor.convertFileSrc(result.page!.documentPreviewImageFileUri ?? result.page!.originalImageFileUri)
					}
				}
			}
		}, {
			text: 'Filter',
			icon: "color-filter",
			role: 'default',
			handler: async () => {
				this.pageToFilterIndex = position
				this.filterModalOpen = true
			}
		}, {
			text: 'Export PDF',
			icon: "download-outline",
			role: 'default',
			handler: async () => {
				let path = await this.scanbot.writePdf(this.pageIds, "A4")
				console.log("PDF saved at path: " + path);
			}
		}, {
			text: 'Export Tiff',
			icon: "download-outline",
			role: 'default',
			handler: async () => {
				let path = await this.scanbot.writeTiff(this.pageIds)
				console.log("TIFF saved at path: " + path);
			}
		}, {
			text: 'Delete',
			role: 'destructive',
			icon: 'trash',
			handler: async () => {
				const page = await this.scanbot.getPageById(this.pageIds[position])
				this.scanbot.removePage(page);
				this.pageIds.splice(position, 1)
				this.images.splice(position, 1)
			}
		}, {
			text: 'Cancel',
			icon: 'close',
			role: 'cancel',
			handler: () => { }
		})

		const actionSheet = await this.actionSheetController.create({
			header: 'Photo',
			buttons: buttons
		});
		await actionSheet.present();
	}
}