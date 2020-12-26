var name="window";
var Tom={
    name:"Tom",
    show:function(){
        //this:window
        //window.name
        console.log(this.name);
    },
    wait:function(){
        // this:Tom
        //var fun=Tom.show
        var fun=this.show;
        fun();
    }
};
Tom.wait();