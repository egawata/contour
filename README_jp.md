# 輪郭抽出ツール

[Manual(English)](./README.md)

## 概要

画像ファイルから輪郭を抽出するツールです。 

<img src="sample/webapp.png" width="400">

## 利用例

[Clip Studio Paint での利用例](./docs/clipstudio_howto.md)

## Web アプリケーション版

いくつか方法があります。

### Docker イメージを利用(推奨)

[Docker image](https://hub.docker.com/r/egawata/contour/tags)

~~~sh
docker run -p 8080:8080 egawata/contour
~~~

その後 `http://localhost:8080` をブラウザで開いてください。

### Docker イメージをローカル環境でビルド

~~~sh
docker build -t egawata/contour .
docker run -p 8080:8080 egawata/contour
~~~

その後 `http://localhost:8080` をブラウザで開いてください。

### ソースコードからビルド

ソースコードからのビルドには、Go, npm, [OpenCV](https://opencv.org/) ライブラリが必要です。
以下のスクリプトを実行してビルドしてください。

~~~sh
script/build.sh
~~~

その後以下を実行してアプリケーションを起動し、`http://localhost:8080` にブラウザからアクセスしてください。

~~~sh
cd backend
./app
~~~

## CLI版

ソースからビルドするには、Go, npm, [OpenCV](https://opencv.org/)ライブラリが必要です。

~~~sh
go install github.com/egawata/contour
contour -i input.jpg -o output.png
~~~

- `-i`: 入力ファイル名
- `-o`: 出力ファイル名
- `-t1` `-t2`: 閾値。Default = `t1: 100` `t2: 200`
    - `t1`: 下限値。これ以下のエッジは輪郭と判断されない。
    - `t2`: 上限値。これ以上のエッジは輪郭と判断される。
    - `t1` - `t2` の間のエッジは、輪郭と判断されたエッジと隣接している場合に輪郭になる。 

### CLI 実行サンプル

~~~
contour -i sample/input.jpg -o sample/output.jpg -t1 50 -t2 150
~~~

入力イメージ

<img src="sample/input.jpg" width="300" />

出力イメージ

<img src="sample/output.jpg" width="300" />

## ライセンス

Licensed under the Apache 2.0 license. Copyright (c) 2024 by egawata
