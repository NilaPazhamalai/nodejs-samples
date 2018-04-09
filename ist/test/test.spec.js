var should = require('chai').should();
var index = require('../srcer/index');

describe('test hello', function(){
it('prints hello',function (done){
    var str = index("hi");
    str.should.equal("hello");
    done();
});
});