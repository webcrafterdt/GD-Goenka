import { Component, OnInit } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { NavParams, Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ChangeDetectorRef, NgZone } from '@angular/core';


@Component({
  selector: 'app-newsmodal',
  templateUrl: './newsmodal.page.html',
  styleUrls: ['./newsmodal.page.scss'],
})
export class NewsmodalPage implements OnInit {
  homework: any[] = []; // 🔹 yaha aapko data mil jayega
  selectedFiles: File[] = [];
  //  base64DataArray:any;
  //  selectedFileNames:any;
  allowedFileTypes: any = [];
  selectedFileNames: string[] = [];     // ✅ MUST be array
  base64DataArray: string[] = [];
  descriptions: string[] = [];
  orientations: string[] = [];
  constructor(private zone: NgZone, private cdr: ChangeDetectorRef, public modalController: ModalController, private navParams: NavParams, private platform: Platform) { }








  triggerPdfInput_old() {
    const input = document.querySelector('input[type=file]') as HTMLInputElement;
    input.click();

  }


  /**************************Homework uploading starts*****************************/
  triggerPdfInput(index: number) {
    console.log("xcxcxcxcxc  ssss", index);
    // this.attachmentUploadLocationArray=attachment_upload_location;
    // console.log('this.attachmentUploadLocationArray',this.attachmentUploadLocationArray);
    //    const pdfInput = document.getElementById(`pdfInput${index}_${fileIndex}`) as HTMLInputElement;
    const pdfInput = document.getElementById(`pdfInput`) as HTMLInputElement;
    console.log("pdfInput->", pdfInput);
    if (pdfInput) {
      pdfInput.value = ''; // Clear the input value
      pdfInput.click(); // Trigger the file input click
    }
  }



  async onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.allowedFileTypes = [
      // 'text/plain',
      // 'application/pdf',
      // 'application/msword',
      // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/bmp',
      'image/gif'
    ];

    // Point 11 fix: same set, but as file extensions. Some devices
    // (mainly Android when picking from certain gallery apps) return an
    // empty/incorrect file.type, so checking MIME type alone wrongly
    // rejected valid jpg/png images. A file is now accepted if EITHER
    // the MIME type OR the extension matches - matching the "jpg, png
    // etc like web" behaviour.
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

    // Point 12 fix: web enforces < 1MB, this was set to 5MB.
    const maxFileSizeBytes = 1048576; // 1 MB, same as web

    // init arrays (important)
    if (!this.selectedFileNames) this.selectedFileNames = [];
    if (!this.base64DataArray) this.base64DataArray = [];
    if (!this.descriptions) this.descriptions = [];
    if (!this.orientations) this.orientations = [];

    for (let i = 0; i < input.files.length; i++) {

      if (this.selectedFileNames.length >= 3) {
        alert('Maximum 3 files allowed');
        break;
      }

      const file = input.files[i];

      /* ===== TYPE CHECK (Point 11) ===== */
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const isTypeAllowed = this.allowedFileTypes.includes(file.type);
      const isExtensionAllowed = allowedExtensions.includes(extension);
      if (!isTypeAllowed && !isExtensionAllowed) {
        alert(`"${file.name}" is not a supported file type. Only JPG, JPEG, PNG, BMP or GIF images are allowed.`);
        continue;
      }

      /* ===== SIZE CHECK (Point 12: 1MB, same as web) ===== */
      if (file.size > maxFileSizeBytes) {
        alert(`"${file.name}" is too large. Maximum allowed size is < 1 MB.`);
        continue;
      }

      /* ===== PUSH FILE NAME ===== */
      this.zone.run(() => {
        this.selectedFileNames.push(file.name);
        // Point 10 fix: default the newly added image's orientation to
        // Landscape (same index as the file just pushed) instead of
        // leaving it unset, so the radio button shows Landscape selected
        // by default like the web app does.
        this.orientations.push('landscape');
        this.descriptions.push('');
      });

      /* ===== BASE64 ===== */
      const base64Data = await this.convertToBase64(file);
      this.base64DataArray.push(base64Data);

      /* ===== OPTIONAL LOCAL SAVE ===== */
      const directory = this.platform.is('android')
        ? Directory.External
        : Directory.Documents;

      await Filesystem.writeFile({
        path: file.name,
        data: base64Data,
        directory
      });
    }

    console.log('Names Array:', this.selectedFileNames);
    console.log('Base64 Array:', this.base64DataArray);


    if (this.selectedFileNames.length > 3) {
      alert('Maximum 3 files allowed');
      return false;
    }

    this.cdr.detectChanges();
    input.value = '';

  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve((reader.result as string).split(',')[1]);
      };
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  removeFile(index: number) {
    console.log("xcxcxcxcxc-->", index);
    this.selectedFiles.splice(index, 1);
    this.selectedFileNames.splice(index, 1);
    this.base64DataArray.splice(index, 1);
    this.descriptions.splice(index, 1);
    this.orientations.splice(index, 1);
    console.log("this.selectedFiles-->", this.selectedFiles);
    console.log("this.base64DataArray-->", this.selectedFiles);
  }

  ngOnInit() {

    this.homework = this.navParams.get('homework');
    console.log('this.filteredHomework==>', this.homework);
  }
  opefile(filename) {
    Browser.open({ url: filename })
  }
  // async closeModel() {
  //    const close: string = "Modal Removed";
  //   await this.modalController.dismiss(close);
  // }

  async closeModel() {
    await this.modalController.dismiss({
      fileNames: this.selectedFileNames,
      base64Files: this.base64DataArray,
      descriptions: this.descriptions,
      orientations: this.orientations

    });
  }



  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    let decoded = txt.value;
    // Remove wrapping <p> tags
    decoded = decoded.replace(/^<p>/i, '').replace(/<\/p>$/i, '');
    return decoded;
  }
}




















