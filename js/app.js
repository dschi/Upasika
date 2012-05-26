var app = {
	
	fadeBird	: 1000,		// bird fade speed
	current		: null,		// screen present
	locked		: true,		// animating?
	
	/**
	 * init function 
	*/
	init : function () 
	{
		if (this.isinit==true)
			return;
		this.isinit = true;

		var p = this;
		this._preload( function () { p._start(); } );
	},
	
	/**
	 * Preloads some images, and then calls the callback passed
	 */
	_preload : function ( callback )
	{
		// images to be preloaded (rel. to assets folder)
		var toload = [
		    'img/angel_1.png',
			'img/angel_2.png',
			'img/angel_3.png',
		];
		var loaded = 0;
		var images = [];

		var cb = function (ev) {
			loaded++;
			alert(loaded + " " + toload.length);
			if (loaded >= toload.length) {
				callback();
			}
		};
		var img;
		for (var i=0,l=toload.length;i<l;i++)
		{
			img = $('<img />').load( cb ).attr('src', toload[i]);
			images.push( img );
		}
	},
	
	/*
	 * Show birds and menu
	*/
	_start : function()
	{
		var t = this;
		// create angels and add them
		var container = $('.wrapper');
		for(var i=1; i < 4; i++)
		{
			$('<div />').hide().addClass('angel_' + i).appendTo(container).delay((i-1)*t.fadeBird).fadeIn('slow');
		}
		// show menu
		$('#navigation').delay((i-1)*t.fadeBird).fadeIn('slow', function() { t._setLocked(false)});
		// register click handler
		$('#navigation').delegate('a', 'click', $.proxy(t._onNavClick, t));
	},
	
	/**
	*  Handler for menu clicks
	*/
	_onNavClick : function(evt)
	{
		var t = this;
		var targ = $(evt.target);
		var next = $(targ.attr('href')).first();
		
		if(t.locked || (t.current != null && (t.current.attr('id') == next.attr('id')))) return;
		t._setLocked(true);
		
		if(t.current == null)
		{
			$('.angel_2').fadeOut('slow', function() { 
				t._fadeIn(next);
			});
			$('.angel_3').fadeOut('slow');
		}
		else
		{
			t.current.fadeOut('slow', function() { 
				t._fadeIn(next);
			});
		}
		t.current = next;
	},
	
	/**
	*  Fades a sceen in and unsets the lock
	*/
	_fadeIn : function(elm)
	{
		var t = this;
		elm.fadeIn('slow', function() {
			t._setLocked(false);
		})
	},
	
	/**
	*  Set lock state
	*/
	_setLocked : function(val)
	{
		this.locked = val;
	}
};