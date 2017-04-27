const tap = require('tap');
const Collection = require('../index').Collection;
const Model = require('../index').Model;

const countries = new Collection();

countries.seed([
  {name: 'Spain', continent: 'Europe'},
  {name: 'Austria', continent: 'Europe'},
  {name: 'Canada', continent: 'North America'},
  {name: 'Mali', continent: 'Africa'},
  {name: 'Nigeria', continent: 'Africa'},
  {name: 'Nicaragua', continent: 'South America'}
]);

tap.equal(countries.all().length, 6, 'Collection.all should return all options');

countries.seed({name: 'South Korea', continent: 'Asia'});
tap.equal(countries.all().length, 7, 'Should be able to seed individual items');

countries.seed({name: 'Spain', continent: 'Europe'});
tap.equal(countries.all().length, 7, 'Cannot add duplicate items');

// Filtering
tap.equal(countries.all({continent: 'Europe'}).length, 2, 'Can filter by property');

tap.equal(countries.all({continent: 'Europe', name: 'Spain'})[0].name, 'Spain', 'Can filter by multiple properties');

tap.equal(countries.all({continent: function(continent) {
  return continent.toLowerCase().indexOf('america') > -1;
}}).length, 2, 'Can filter by property with function');

tap.equal(countries.all(function(country) {
  return country.continent === 'Africa';
}).length, 2, 'Can filter by function');

tap.throws(function() {
  countries.filter({wrongProperty: true});
}, {}, 'Error thrown if filtering on non-existant key');

// Check that JSONifying objects works
const friends = new Collection();
friends.seed({name: 'Joey'});
friends.seed({name: 'Phoebe'});
tap.equal(friends.toJSON(), '[{"name":"Joey"},{"name":"Phoebe"}]');

// Check that JSONifying models works
const dogs = new Collection();
dogs.seed(new Model({name: 'Fido', size: 'M'}));
tap.equal(dogs.toJSON(), '[{"name":"Fido","size":"M"}]');
