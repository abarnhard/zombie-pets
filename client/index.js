(function(){
  'use strict';

  angular.module('zombie-pets', [])
  .controller('MainController', ['$scope', function($scope){
    $scope.title = 'Zombie Pets';

    $scope.weapon = {};
    $scope.weapons = [];
    $scope.pet = {health:100};
    $scope.pets = [
      {
        health: 100,
        name: 'Baxter',
        photo: 'http://cdn.thewire.com/media/img/upload/wire/2013/12/17/Screen_Shot_2013_12_17_at_9.51.27_AM/lead_large.png',
        weapon: {
          name: 'HK-47',
          photo: 'http://i9.photobucket.com/albums/a82/evilxteddyxbear/g36cuy9.jpg',
          damage: 80
        }
      },
      {
        health: 100,
        name: 'Hungry',
        photo: 'http://imgc.allpostersimages.com/images/P-473-488-90/21/2142/YQRED00Z/posters/tony-heald-hippopotamus-surrounded-by-water-lettuce-kruger-national-park-south-africa.jpg',
        weapon: {
          name: 'Axe',
          photo: 'http://ecx.images-amazon.com/images/I/51Ho7uxa9BL._SL1500_.jpg',
          damage: 50
        }
      }
    ];

    $scope.player1 = null;
    $scope.player2 = null;

    $scope.fight = function(){
      // debugger;
      var first  = Math.floor(Math.random() * 2) + 1,
          second = first === 1 ? 2 : 1,
          p1     = $scope['player' + first],
          hBar1  = '#health' + first,
          p2     = $scope['player' + second],
          hBar2  = '#health' + second,
          damage,
          hBarWidth,
          hBarColor;

      if(p1.isZombie){
        damage = Math.floor(Math.random() * 4);
      }else{
        damage = Math.floor(Math.random() * p1.weapon.damage);
      }

      p2.health -= damage;

      if(p2.health <= 0){
        p2.isZombie = true;
        p2.photo = 'http://www.darkhorizons.com/assets/0013/8463/dogz_article.jpg?1298571878';
       }
      hBarWidth = p2.health <= 0 ? 0 : p2.health + '%';
      hBarColor = p2.health > 10 ? 'green' : 'red';
      $(hBar2).css('width', hBarWidth);
      $(hBar2).css('background-color', hBarColor);

      if(p2.isZombie){
        damage = Math.floor(Math.random() * 4);
      }else{
        damage = Math.floor(Math.random() * p2.weapon.damage);
      }

      p1.health -= damage;

      if(p1.health <= 0){
        p1.isZombie = true;
        p1.photo = 'http://www.darkhorizons.com/assets/0013/8463/dogz_article.jpg?1298571878';
      }
      hBarWidth = p1.health <= 0 ? 0 : p1.health + '%';
      hBarColor = p1.health > 10 ? 'green' : 'red';
      $(hBar1).css('width', hBarWidth);
      $(hBar1).css('background-color', hBarColor);

    };

    $scope.setPlayer = function(num){
      $scope['player' + num] = this.p;
      $scope['isSet' + num] = true;
    };

    $scope.isSet = function(num){
      return !!$scope['player' + num];
    };

    $scope.addWeapon = function(){
      $scope.weapons.push($scope.weapon);
      $scope.weapon = {};
      $('#name').focus();
    };

    $scope.addPet = function(){
      $scope.pet.weapon = $scope.weapons[$scope.pet.weapon];
      $scope.pets.push($scope.pet);
      $scope.pet = {health:100};
      $('#petname').focus();
    };

    $scope.toggleWeapon = function(){
      $scope.hideWeapon = !!!$scope.hideWeapon;
    };

    $scope.togglePet = function(){
      $scope.hidePet = !!!$scope.hidePet;
    };

  }]);
})();

