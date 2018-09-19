const miscHelper ={
    createNumber: ()=>{
        let num =1
        // for(i=0;){}
        Number.prototype.pad = function(size) {
            var s = String(this);
            while (s.length < (size || 2))
            {s = "0" + s;}
            return s;
          }
        // return Math.round((Math.pow(36, 10 + 1) - Math.random() * Math.pow(36, 10))).toString(36).slice(1);
    }
}