#!/bin/bash

# Check if correct number of arguments is provided
usage() {
    echo "Usage: $0 [-n|--no-background] input.svg"
    echo "Options:"
    echo "  -n, --no-background    Remove the background (make it transparent)"
    exit 1
}

# Parse arguments
no_background=false
input_file=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -n|--no-background)
            no_background=true
            shift
            ;;
        *)
            if [ -z "$input_file" ]; then
                input_file="$1"
            else
                usage
            fi
            shift
            ;;
    esac
done

# Check if input file is provided
if [ -z "$input_file" ]; then
    usage
fi

filename="${input_file%.*}"
output_file="${filename}_inverted.svg"

# Check if input file exists
if [ ! -f "$input_file" ]; then
    echo "Error: Input file '$input_file' not found."
    exit 1
fi

# Check if input file has .svg extension
if [[ ! "$input_file" =~ \.svg$ ]]; then
    echo "Error: Input file must be an SVG file."
    exit 1
fi

# Function to invert a hex color
invert_hex() {
    local hex="$1"
    # Remove # if present
    hex="${hex#\#}"
    # Convert to uppercase for consistency
    hex=$(echo "$hex" | tr '[:lower:]' '[:upper:]')
    
    # Extract RGB components
    r=$(printf "%d" "0x${hex:0:2}")
    g=$(printf "%d" "0x${hex:2:2}")
    b=$(printf "%d" "0x${hex:4:2}")
    
    # Invert each component
    r=$((255 - r))
    g=$((255 - g))
    b=$((255 - b))
    
    # Convert back to hex
    printf "#%02X%02X%02X" $r $g $b
}

# Create a temporary file
temp_file=$(mktemp)

# Process the file
first_path=true
while IFS= read -r line; do
    # Skip background path if no-background option is set
    if $no_background && $first_path && [[ $line =~ \<path.*d=\"M0\ 0.*\> ]]; then
        first_path=false
        continue
    fi
    
    # Extract fill color if present
    if [[ $line =~ fill=\"#([A-Fa-f0-9]{6})\" ]]; then
        orig_color="#${BASH_REMATCH[1]}"
        inverted_color=$(invert_hex "$orig_color")
        echo "Inverting fill color: $orig_color -> $inverted_color" >&2
        line="${line//fill=\"$orig_color\"/fill=\"$inverted_color\"}"
    fi
    
    # Extract stroke color if present
    if [[ $line =~ stroke=\"#([A-Fa-f0-9]{6})\" ]]; then
        orig_color="#${BASH_REMATCH[1]}"
        inverted_color=$(invert_hex "$orig_color")
        echo "Inverting stroke color: $orig_color -> $inverted_color" >&2
        line="${line//stroke=\"$orig_color\"/stroke=\"$inverted_color\"}"
    fi
    
    echo "$line" >> "$temp_file"
done < "$input_file"

# Move temporary file to output file
mv "$temp_file" "$output_file"

echo "Inverted SVG saved as: $output_file"
if $no_background; then
    echo "Background has been removed"
fi 