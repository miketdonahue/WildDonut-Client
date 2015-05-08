(function() {

  angular
    .module('wildDonut')
    .factory('ImageManager', ImageManager);

  ImageManager.$inject = ['$upload'];

  function ImageManager($upload) {

    var instance = {
      postSelectedImage: postSelectedImage
    };

    return instance;

    // implementation of functions
    function postSelectedImage(files, name, category, cb) {
      name = name || Date.now();
      if (files && files.length) {
        var params = {
         file : files[0],
         fields : { 'name': name },
         url : 'http://localhost:4568/api/images/' + category + '/s3upload'
        };

        $upload.upload(params)
        .progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        })
        .success(function (data, status, headers, config) {
          cb(data + '?' + Date.now());
        });
      }
    }
  }
})();
