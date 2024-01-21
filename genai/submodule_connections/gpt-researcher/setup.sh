

conda create --name gpt-researcher python=3.12
conda activate gpt-researcher
ln -s ../../downloads/github/assafelovic/ .
pip install -r requirements.txt
pip install aiofiles

# If you get errors, perhaps due to M2 mac , 
# https://stackoverflow.com/questions/69097224/gobject-2-0-0-not-able-to-load-on-macbook
brew install weasyprint             
brew install pango libffi   
mkdir /usr/local/lib
sudo ln -s /opt/homebrew/opt/glib/lib/libgobject-2.0.0.dylib /usr/local/lib/gobject-2.0
sudo ln -s /opt/homebrew/opt/pango/lib/libpango-1.0.dylib /usr/local/lib/pango-1.0
sudo ln -s /opt/homebrew/opt/harfbuzz/lib/libharfbuzz.dylib /usr/local/lib/harfbuzz
sudo ln -s /opt/homebrew/opt/fontconfig/lib/libfontconfig.1.dylib /usr/local/lib/fontconfig-1
sudo ln -s /opt/homebrew/opt/pango/lib/libpangoft2-1.0.dylib /usr/local/lib/pangoft2-1.0
# If rust is not installed
#curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh




