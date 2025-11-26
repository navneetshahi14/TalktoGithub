import express from 'express'
import { folderStructure,analyzeRepo } from '../controller/repo.controller';
const router = express.Router();

router.post('/analyze',analyzeRepo)
router.post('/folder_structure',folderStructure);

export default router