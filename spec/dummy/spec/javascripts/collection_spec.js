describe("NailPolish.Collection", function () {
  var collection;

  beforeEach(function() {
    collection = new NailPolish.Collection();
  });

  it("Uses the fetch mixin", function() {
    expect(collection.fetch).toBe(NailPolish.Mixins.Fetch.fetch);
  });
});
