const assert = require('assert');
const { can, cannot, define } = require("../src/index");

const eat = (smth) => `eat${smth}`;
const foo = (smth) => `foo${smth}`;
const bar = (smth) => `bar${smth}`;

describe('Rability', () => {
  describe('can', () => {
      it("permits", () => {
          assert.equal(can(eat, "Apple").eatApple(), true);
      })

      it("permits multiple", () => {
        const permission = can([eat, foo ,bar], ["Apple", "Candies"])
        assert.equal(permission.eatApple(), true);
        assert.equal(permission.fooApple(), true);
        assert.equal(permission.barApple(), true);
        assert.equal(permission.eatCandies(), true);
        assert.equal(permission.fooCandies(), true);
        assert.equal(permission.barCandies(), true);
      })
  })

  describe('cannot', () => {
    it("prohibits", () => {
        assert.equal(cannot(eat, "Apple").eatApple(), false);
    })

    it("prohibits multiple", () => {
        const permission = cannot([eat, foo ,bar], ["Apple", "Candies"])
        assert.equal(permission.eatApple(), false);
        assert.equal(permission.fooApple(), false);
        assert.equal(permission.barApple(), false);
        assert.equal(permission.eatCandies(), false);
        assert.equal(permission.fooCandies(), false);
        assert.equal(permission.barCandies(), false);
    })
})


  describe('define', () => {
    it('merges all permissions together', () => {
        const permission = define(
            can([eat, foo], "Apple"),
            cannot([eat, bar], "Candies")
        )

        assert.equal(permission.eatApple(), true);
        assert.equal(permission.fooApple(), true);
        assert.equal(permission.eatCandies(), false);
        assert.equal(permission.barCandies(), false);
    });
  });
});
