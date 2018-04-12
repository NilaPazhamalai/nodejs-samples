var should = require('chai').should();
var index = require('../src/index');

describe('test hello', function(){
it('prints hello',function (done){
    var str = index("hi");
    str.should.equal("hello");
    done();
});
it('prints hello - error',function (done){
    var str = index("helllloo");
    str.should.equal("gggogy");
    done();
});
});