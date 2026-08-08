import { createWorker } from 'tesseract.js';

export interface OCRResult {
  extractedText: string;
  confidence: number;
}

export async function extractTextFromImage(
  imageFile: File | Blob,
  onProgress?: (status: string, progress: number) => void
): Promise<OCRResult> {
  try {
    if (onProgress) onProgress('Initializing OCR Engine...', 10);
    
    const worker = await createWorker('eng');
    
    if (onProgress) onProgress('Scanning image text via Neural Network...', 40);
    
    const ret = await worker.recognize(imageFile);
    
    if (onProgress) onProgress('Finalizing extracted text...', 90);
    
    await worker.terminate();

    return {
      extractedText: ret.data.text.trim() || 'No readable text extracted from image.',
      confidence: Math.round(ret.data.confidence || 90)
    };
  } catch (error) {
    console.error('OCR Extraction failed:', error);
    return {
      extractedText: 'Failed to process OCR. Text could not be read.',
      confidence: 0
    };
  }
}
