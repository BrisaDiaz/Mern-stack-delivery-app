import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

const files = await imagemin(['images/*.{jpg,png}'], {
  sourcePath: 'storage/media',
	destination:'storage/media',
	plugins: [
		imageminJpegtran(),
		imageminPngquant({
			quality: [0.6, 0.8]
		})
	]
});

console.log(files);
