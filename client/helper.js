var Helpers = {
  getTime: function () {
    var d = new Date();
    var out = [d.getHours()%12,':',d.getMinutes(),':', d.getSeconds()].join('');
    return out;
  }
}