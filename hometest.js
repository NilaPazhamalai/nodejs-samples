var should = require('chai').should();
var htmlExport = require('./ext-export-escapeHtml.js');
var escape = htmlExport.escape;
var unescape = htmlExport.unescape;
var add =  htmlExport.add;


describe('#escape method', ()=>{


it('converts & into &amp;', function() {
    escape('&').should.equal('&amp;');
  });

  it('converts " into &quot;', function() {
    escape('"').should.equal('&quot;');
  });

  it('converts \' into &#39;', function() {
    escape("'").should.equal('&#39;');
  });

  it('converts < into &lt;', function() {
    escape('<').should.equal('&lt;');
  });

  it('converts > into &gt;', function() {
    escape('>').should.equal('&gt;');
  });
});


describe("# add method in html export function", ()=>{

    it('call with 2 arg' , ()=>{
        add(6,9).should.equal(15);
    })
});

