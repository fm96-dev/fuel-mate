# setup for pnpm store
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