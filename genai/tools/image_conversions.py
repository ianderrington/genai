import argparse
import os
import subprocess
from PIL import Image
import glob
from datetime import datetime

def move_existing_file(file_path):
    """Moves an existing file by renaming it with a timestamp."""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    new_path = f"{os.path.splitext(file_path)[0]}_{timestamp}{os.path.splitext(file_path)[1]}"
    os.rename(file_path, new_path)
    return new_path

def convert_image(image_path, output_format, quality=None):
    """Converts an image to the specified format."""
    output_path = os.path.splitext(image_path)[0] + '.' + output_format.lower()
    if os.path.exists(output_path):
        image_path = move_existing_file(output_path)

    if output_format.lower() == 'avif':
        # Convert to AVIF using external avifenc tool

        quality_param = f"-a cq-level={quality}" if quality else ""
        subprocess.run(f"avifenc --min 0 --max 63 -a end-usage=q {quality_param} -a tune=ssim {image_path} {output_path}", shell=True)
    elif output_format.lower() in ['webp', 'png']:
        # Convert to WebP or PNG using Pillow
        if output_format.lower() == 'png' and os.path.exists(output_path):
            move_existing_file(output_path)

        save_params = {
            "format": output_format.upper()
        }

        # Add quality parameter for WebP
        if quality is not None and output_format.lower() == 'webp':
            save_params['quality'] = quality

        image = Image.open(image_path)
        image.save(output_path, **save_params)
    else:
        raise ValueError("Unsupported format. Please use 'AVIF', 'WEBP', or 'PNG'.")
    return image_path

def main(args):
    """Main function to handle command line arguments for image conversion."""
    expanded_paths = []
    for path_pattern in args.image_paths:
        expanded_paths.extend(glob.glob(path_pattern))

    for image_path in expanded_paths:
        for fmt in args.formats:
            image_path = convert_image(image_path, fmt, args.quality)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Convert images to AVIF, WebP, PNG, or a combination of these formats with optional quality setting.\n " \
                    example: python ~/git/genai/genai/tools/image_conversions.py 1-landscape*.png --quality 10')
    parser.add_argument('image_paths', nargs='+', help='Path(s) of the image(s) to be converted.')
    # parser.add_argument('--formats', nargs='+', choices=['AVIF', 'WEBP', 'PNG'], required=True, help='Output format(s) (AVIF, WEBP, and/or PNG).')
    # make above with choices defaulted to all above
    parser.add_argument('--formats', nargs='+', choices=['AVIF', 'WEBP', 'PNG'], default=['AVIF', 'WEBP', 'PNG'], help='Output format(s) (AVIF, WEBP, and/or PNG).')
    parser.add_argument('--quality', type=int, choices=range(1, 101), help='Optional. Set the quality of the output image (1-100). Higher values mean better quality and larger file sizes.')

    args = parser.parse_args()
    main(args)
