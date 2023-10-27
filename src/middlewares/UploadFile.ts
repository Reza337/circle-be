import * as multer from "multer";

// Konfigurasi penyimpanan file di sistem file lokal
const storage: multer.StorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		// Tentukan folder penyimpanan di sini
		cb(null, "src/Upload");
	},
	filename: (req, file, cb) => {
		// Tentukan nama file yang diunggah
		cb(null, file.originalname);
	},
});

// Inisialisasi middleware multer dengan konfigurasi storage
const upload: multer.Multer = multer({
	storage: storage,
});

export default upload;
