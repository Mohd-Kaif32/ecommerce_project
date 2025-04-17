class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }:{}
        this.query=this.query.find({...keyword});
        // console.log(keyword);
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr};
        // console.log(queryCopy);
        // removing some fields for category
        console.log(queryCopy);
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);
        console.log(queryCopy);
        
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);




        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
}

module.exports=ApiFeatures;