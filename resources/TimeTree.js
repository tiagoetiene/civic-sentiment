TimeTree = function( ) {
	var Class = Meteor.require('jsclass/src/core').Class;
	var Comparable = Meteor.require('jsclass/src/comparable').Comparable;
	var SortedSet = Meteor.require('jsclass/src/set').SortedSet;
	var Node = new Class( {
				include : Comparable,
				initialize: function( bin, date ) {
        				this.bin = bin;
        				this.date = date;
        				this.counter = 0;
        				this.sentiment = 0;
    				},
				compareTo : function( other ) {
					if(this.bin < other.bin) return -1;
					if(this.bin > other.bin) return +1;
					return 0;
				},
				equals: function( other ) {
        				return (other instanceof this.klass)
            				&& this.bin ==  other.bin;
    				},
			});


	var _depth = 24;
	var _hasTree = false;
	var _dateValuer = Number;
	var _sentimentValuer = Number;
	var _intervals = [];
	var _tree = [];
	var _maxNodeSize = 100;

	function increment( set, obj, sentiment ) {
		var index = set._indexOf( obj );
		if( index !== -1) {
			set._members[ index ].counter++;
			set._members[ index ].sentiment += sentiment;
			return;
		}
		console.assert(0);
	}

	function tree() { 
		var milliseconds = 1000.0;
		_intervals = [];
		_tree = [];

		for(var i = 0; i < _depth; ++i) {
			_tree[ i ] = new SortedSet();
			_intervals[ i ] = milliseconds; 
			milliseconds *= 2;
		}
		_hasTree = true;
	}

	tree.add = function( _ ) {
		if( _hasTree == false )
			tree();

		var bin;
		var node;
		var tmp;
		var date = +_dateValuer.call( this, _ );
		var sent = _sentimentValuer.call( this, _ );

		// Adding new data to the three
		for( var i = 0; i < _depth; ++i ) {
			bin = Math.floor( date / _intervals[ i ] );
			tmp = new Node( bin, _intervals[ i ] * bin );
			
			_tree[ i ].add( tmp )
			node = increment( _tree[ i ], tmp,  sent);
		}

		// Removing data if the tree becomes too long
		for( var i = 0; i < _depth; ++i )
			while(_tree[ i ].length > _maxNodeSize) 
				_tree[ i ].remove( new Node( _tree[ i ].first( 1 )[0].bin )  );

		// Sanity check
		for( var i = 0; i < _depth; ++i ) 
			console.assert( _tree[ i ].length <= _maxNodeSize );

		return tree;
	}

	tree.depth = function( _ ) {
		if( arguments.length == 0 )
			return _;
		_depth = _;
		return tree;
	}

	tree.dateValuer = function( _ ) {
		if( arguments.length == 0 )
			return _;
		_dateValuer = _;
		return tree;
	}

	tree.sentimentValuer = function( _ ) {
		if( arguments.length == 0 )
			return _;
		_sentimentValuer = _;
		return tree;
	}

	tree.get = function( interval, past ) {
		var idx;
		for(idx = 0; idx < _intervals.length; ++idx)
			if( _intervals[ idx ] > interval)
				break;
		idx = Math.min( _depth - 1, idx );
		return _tree[ idx ].select( function( d ) {
					return (d.date +_intervals[idx]) >= +past;
				});
	}

	return tree;
}