import Nightmare  from 'nightmare';
import { expect } from 'chai';

describe('disable_interpolation_spec', function() {
    it('Disable inner interpolation', function(done) {
        new Nightmare()
            .goto('http://localhost:3003/disable_interpolation.html')
            .wait('[data-status="ready"]')
            .evaluate(() => document.getElementById('mustache').innerText)
            .end()
            .then((text) => {
                expect(text).to.equal('{{ invisible }}');
                done()
            });
    });

    it('Disable attribute interpolation', function(done) {
        new Nightmare()
            .goto('http://localhost:3003/disable_interpolation.html')
            .wait('[data-status="ready"]')
            .evaluate(() => document.getElementById('mustache-attr').dataset.attr)
            .end()
            .then((text) => {
                expect(text).to.equal('{{ invisible }}');
                done()
            });
    });

    it('Not disable directive', function(done) {
        new Nightmare()
            .goto('http://localhost:3003/disable_interpolation.html')
            .wait('[data-status="ready"]')
            .evaluate(() => document.getElementById('directive').innerText)
            .end()
            .then((text) => {
                expect(text).to.equal('--OK--');
                done()
            });
    });
});
