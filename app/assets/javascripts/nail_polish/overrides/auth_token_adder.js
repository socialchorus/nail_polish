NailPolish.AuthTokenAdder = function (args) {
  this.args = args;
  this.type = args.type.toLowerCase();
  this.authenticityToken = $('meta[name="csrf-token"]').attr('content');
};

NailPolish.AuthTokenAdder.prototype.perform = function () {
  if ( this.type == 'post' ||  this.type == 'put' ||
    this.type == 'patch' || this.type == 'delete' ) {
    this.args.headers = this.args.headers || {};
    this.args.headers['X-CSRF-Token'] = this.authenticityToken;
  }

  return this.args;
};
