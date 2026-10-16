#!/bin/sh
set -e

echo "===== XCODE CLOUD POST CLONE START ====="

NODE_VERSION="20.19.5"
NODE_DIR="$HOME/node-$NODE_VERSION"

echo "Installing Node.js $NODE_VERSION..."

if [ ! -x "$NODE_DIR/bin/node" ]; then
    curl -fsSL "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-darwin-x64.tar.gz" \
        -o "$TMPDIR/node.tar.gz"

    mkdir -p "$NODE_DIR"

    tar -xzf "$TMPDIR/node.tar.gz" \
        --strip-components=1 \
        -C "$NODE_DIR"
fi

export PATH="$NODE_DIR/bin:$PATH"

echo "Node version:"
node -v

echo "NPM version:"
npm -v

echo "Moving to project root..."

cd "$CI_PRIMARY_REPOSITORY_PATH"

echo "Current directory:"
pwd

echo "Installing npm dependencies..."
npm ci

echo "Building Angular..."
npm run build

echo "Syncing Capacitor..."
npx cap sync ios

echo "Installing CocoaPods..."
cd ios/App

pod install

echo "===== XCODE CLOUD POST CLONE FINISHED ====="