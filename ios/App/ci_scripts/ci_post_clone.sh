
#!/bin/sh
set -e

echo "===== XCODE CLOUD POST CLONE START ====="

NODE_VERSION="20.19.5"
ARCH="$(uname -m)"

case "$ARCH" in
    arm64)
        NODE_ARCH="arm64"
        ;;
    x86_64)
        NODE_ARCH="x64"
        ;;
    *)
        echo "Unsupported machine architecture: $ARCH"
        exit 1
        ;;
esac

NODE_DIR="$HOME/node-$NODE_VERSION-$NODE_ARCH"
NODE_ARCHIVE="$TMPDIR/node.tar.gz"

echo "Machine architecture: $ARCH"
echo "Installing Node.js $NODE_VERSION ($NODE_ARCH)..."

if [ ! -x "$NODE_DIR/bin/node" ]; then
    curl -fsSL \
        "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-darwin-$NODE_ARCH.tar.gz" \
        -o "$NODE_ARCHIVE"

    mkdir -p "$NODE_DIR"

    tar -xzf "$NODE_ARCHIVE" \
        --strip-components=1 \
        -C "$NODE_DIR"
fi

export PATH="$NODE_DIR/bin:$PATH"

echo "Node version:"
node -v

echo "Node architecture:"
node -p "process.arch"

echo "NPM version:"
npm -v

cd "$CI_PRIMARY_REPOSITORY_PATH"

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
