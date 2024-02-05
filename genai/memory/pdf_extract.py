import glob
import os
import argparse
import fitz
from PyPDF2 import PdfReader

class PDFExtractor:
    def __init__(self, pdf_path):
        self.pdf_path = pdf_path

    def extract_text(self):
        text = ""
        with open(self.pdf_path, 'rb') as file:
            reader = PdfReader(file)
            num_pages = len(reader.pages)
            for i in range(num_pages):
                text += reader.pages[i].extract_text() + "\n"
        return text

    def extract_images(self):
        pdf_file = fitz.open(self.pdf_path)
        images = []
        for page_index in range(len(pdf_file)):
            page = pdf_file[page_index]
            for image_index, img in enumerate(page.get_images(), start=1):
                xref = img[0]
                base_image = pdf_file.extract_image(xref)
                image_bytes = base_image["image"]
                images.append(image_bytes)
        pdf_file.close()
        return images

    def run(self):
        text = self.extract_text()
        images = self.extract_images()
        return text, images

class TextSaver:
    def __init__(self, text, output_path):
        self.text = text
        self.output_path = output_path

    def save_text(self):
        with open(self.output_path, 'w') as file:
            file.write(self.text)

    def run(self):
        self.save_text()

class ImageSaver:
    def __init__(self, images, output_path):
        self.images = images
        self.output_path = output_path

    def save_images(self):
        for i, image_bytes in enumerate(self.images):
            image_path = os.path.join(self.output_path, f"image_{i}.png")
            with open(image_path, 'wb') as img_file:
                img_file.write(image_bytes)

    def run(self):
        self.save_images()

def process_pdf(pdf_path, output_dir):
    basename = os.path.splitext(os.path.basename(pdf_path))[0]
    extractor = PDFExtractor(pdf_path)
    text, images = extractor.run()

    text_saver = TextSaver(text, os.path.join(output_dir, f'{basename}.txt'))
    text_saver.run()

    image_saver = ImageSaver(images, os.path.join(output_dir, 'images'))
    if not os.path.exists(image_saver.output_path):
        os.makedirs(image_saver.output_path)
    image_saver.run()
    
def main():
    parser = argparse.ArgumentParser(description="PDF Extractor Tool")
    parser.add_argument("input_paths", nargs='+', help="Paths to PDF files or globs")
    args = parser.parse_args()

    for input_path in args.input_paths:
        for pdf_file in glob.glob(input_path):
            if os.path.isdir(pdf_file):
                continue  # Skip directories

            output_dir = os.path.join(os.path.dirname(pdf_file), 'output')
            if not os.path.exists(output_dir):
                os.makedirs(output_dir)
            process_pdf(pdf_file, output_dir)

if __name__ == "__main__":
    main()