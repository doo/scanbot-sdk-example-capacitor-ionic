import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ScanbotService } from '../services/scanbot-service.service';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { ImageFilterType, Page, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';
import { Camera } from '@capacitor/camera';
import { Directory, Filesystem, FilesystemDirectory, WriteFileOptions, WriteFileResult } from '@capacitor/filesystem';
import { DemoRuntimeStorage } from '../services/demo-runtime-storage';

export class DisplayImageFilter {
	filterType: ImageFilterType;
	displayName: string;

	constructor(filterType: ImageFilterType, displayName: string) {
		this.filterType = filterType;
		this.displayName = displayName;
	}
}

@Component({
	selector: 'app-document-results',
	templateUrl: './document-results.page.html',
	styleUrls: ['./document-results.page.scss'],
})
export class DocumentResultsPage implements OnInit {

	constructor(private scanbot: ScanbotService, private actionSheetController: ActionSheetController, private router: Router) {
		this.filterModalOpen = false
		this.displayFilters = [
			new DisplayImageFilter('ImageFilterTypeBackgroundClean', 'Background Clean'),
			new DisplayImageFilter('ImageFilterTypeBinarized', 'Binarized'),
			new DisplayImageFilter('ImageFilterTypeBlackAndWhite', 'Black and White'),
			new DisplayImageFilter('ImageFilterTypeColor', 'Color'),
			new DisplayImageFilter('ImageFilterTypeColorDocument', 'Color Document'),
			new DisplayImageFilter('ImageFilterTypeDeepBinarization', 'Deep Binarization'),
			new DisplayImageFilter('ImageFilterTypeEdgeHighlight', 'Edge Highlight'),
			new DisplayImageFilter('ImageFilterTypeGray', 'Gray'),
			new DisplayImageFilter('ImageFilterTypeLowLightBinarization', 'Low Light Binarization'),
			new DisplayImageFilter('ImageFilterTypeLowLightBinarization2', 'Low Light Binarization 2'),
			new DisplayImageFilter('ImageFilterTypeNone', 'None'),
			new DisplayImageFilter('ImageFilterTypeOtsuBinarization', 'OtsuBinarization'),
			new DisplayImageFilter('ImageFilterTypePureBinarized', 'Pure Binarized'),
			new DisplayImageFilter('ImageFilterTypePureGray', 'Gray')
		]
	}

	images: string[] = []
	displayFilters: DisplayImageFilter[]
	filterModalOpen: boolean

	selectedFilterMode?: string
	pageToFilter?: Page
	pageToFilterIndex?: number

	async reloadData() {
		await this.loadImageThumbnails()
	}

	async ngOnInit() {
		await this.reloadData();
	}

	async loadImageThumbnails() {
		const uris = DemoRuntimeStorage.default.allPagePreviewUris;
		this.images = uris.map(uri => Capacitor.convertFileSrc(uri))
	}

	async onFilterChanged(ev: any) {
		this.selectedFilterMode = ev.target.value
	}

	async setOpen(val: boolean) {
		this.filterModalOpen = val
	}

	async onDeleteAllClick() {
		await ScanbotSDK.cleanup();
		DemoRuntimeStorage.default.removeAllPages();
		this.images = []
	}

	async onAddClick() {
		let res = await Camera.pickImages({})
		let photos = await Promise.all(res.photos.filter(async (photo) => { photo.path !== undefined; }).map(async (photo) => {
			const page = await this.scanbot.addPageFromImage(photo.path!);
			const documentPage = await this.scanbot.detectDocumentOnPage(page);
			DemoRuntimeStorage.default.addPage(documentPage);
			return Capacitor.convertFileSrc(documentPage.documentPreviewImageFileUri ?? documentPage.originalImageFileUri);
		}))
		this.images = photos.concat(this.images)
		await this.reloadData();
	}

	async onFilterBtnPress() {
		if (this.pageToFilter !== undefined) {
			const page = await this.scanbot.applyImageFilterOnPage(this.pageToFilter, this.selectedFilterMode as ImageFilterType);
			const refreshedPages = await this.scanbot.refreshImages([page]);

			DemoRuntimeStorage.default.updatePages(refreshedPages);

			const uri = refreshedPages[0].documentPreviewImageFileUri ?? refreshedPages[0].originalPreviewImageFileUri;
			console.log(uri);
			this.images[this.pageToFilterIndex!] = Capacitor.convertFileSrc(uri)
		}
		this.filterModalOpen = false;
	}

	async showActionSheet(position: number) {
		let buttons = new Array<ActionSheetButton>()

		const selectedPage = DemoRuntimeStorage.default.allPages[position]
		this.pageToFilter = selectedPage

		buttons.push({
			text: 'Crop',
			role: 'crop',
			icon: 'crop',
			handler: async () => {
				if ((await this.scanbot.getLicenseInfo()).isLicenseValid) {
					const result = await this.scanbot.showCropUi(selectedPage)
					if (result.status === "OK") {
						const page = result.page;
						if (page == null) {
							return;
						}

						// Update the page in the demo runtime storage
						DemoRuntimeStorage.default.updatePage(page);

						this.images[position] = Capacitor.convertFileSrc(page.documentPreviewImageFileUri ?? page.originalImageFileUri)
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
				let path = await this.scanbot.writePdf(DemoRuntimeStorage.default.allPageOriginalUris, "A4")
				console.log("PDF saved at path: " + path);
			}
		}, {
			text: 'Export Tiff',
			icon: "download-outline",
			role: 'default',
			handler: async () => {
				let path = await this.scanbot.writeTiff(DemoRuntimeStorage.default.allPageOriginalUris)
				console.log("TIFF saved at path: " + path);
			}
		}, {
			text: 'Delete',
			role: 'destructive',
			icon: 'trash',
			handler: async () => {
				await this.scanbot.removePage(selectedPage);
				DemoRuntimeStorage.default.removePage(selectedPage)
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