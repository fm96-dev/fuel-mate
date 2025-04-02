echo "⚙️ Setting up pnpm store..."
pnpm config set store-dir /home/node/.pnpm-store 
sudo chown -R node:node /home/node/.pnpm-store
echo "✅ Done!"

# create .env file only if .env file doesn't exists
if [ -f .env.example ]; then
  if [  ! -f .env ]; then
    cp .env.example .env 
    echo "✅ .env file created!"
  else
    echo "ℹ️ .env file already exists!"
  fi
fi

# create an AVD
# echo "📱 Creating Android Virtual Device..."
# avdmanager create avd -n Pixel_5_API_35 -k "system-images;android-35;google_apis;x86_64"
# echo "✅ Done!"