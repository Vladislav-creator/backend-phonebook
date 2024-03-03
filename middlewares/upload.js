import multer from "multer";
import path from "path";

const tempDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
});

export const storage = multer({ storage: multerConfig });