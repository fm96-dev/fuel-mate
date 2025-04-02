FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# install Java
RUN apt update && \
    apt install -y openjdk-17-jdk gradle libpulse0
RUN java -version && gradle -v

# Install android sdk
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip

RUN mkdir -p /opt/android-sdk/cmdline-tools && \
    unzip commandlinetools-linux-*.zip -d /opt/android-sdk/cmdline-tools && \
    mv /opt/android-sdk/cmdline-tools/cmdline-tools /opt/android-sdk/cmdline-tools/latest

ENV ANDROID_HOME="/opt/android-sdk"
ENV ANDROID_SDK_ROOT="/opt/android-sdk"
ENV PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH

RUN yes | sdkmanager --licenses && \
    yes | sdkmanager "platform-tools" "emulator" "platforms;android-35" "build-tools;35.0.0" "cmdline-tools;latest" "system-images;android-35;google_apis;x86_64"

RUN sdkmanager --list && adb version