//Controller states raw commands that have their individual functions. That functions are elaborated to include the different functionalities we would like to apply to each function and their conditional use cases.It is like different roads(commands) which have different capacities in the load they carry eg bicyle track, foot paths, car paths, truck paths, trailer paths etc .. with some paths comprising of multiple of each

//requiring our schema model that will apply to our data
const Product = require('../models/product')

const getAllProductsStatic = async (req,res) =>{
    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')
    res.status(200).json({products, nbHits: products.length}
    )
}

//Get products
const getAllProducts = async (req,res) =>{
    //Getting searched products based on select tags for conditional events
    const {featured, company, name, sort, fields, numericFilters, } = req.query
    const queryObject = {}

    if (featured){
        queryObject.featured = featured === "true"? true : false
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = {$regex:name, $options: 'i'}
    }
    // numeric filters to set 'range search' for certain properties (eg price,amount,rating) that deal with numbers
    if (numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        // stating the options where range search applies and where they should be split
        const options = ['price','rating']
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            //if case where the user enters the 'values' in options and also a 'field' value
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }


    console.log(queryObject)
    //sorting the GET products searched for
    let result = Product.find(queryObject)
    //SORT
    //sorting generally and create a list
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }
    //sorting with special parameter i.e. createdAt(time)
    else{
        result = result.sort('createdAt')
    }
    //sorting and selecting based on certain fields(groups)
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    //Pagenation function ie selecting of pages
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit
    
    result = result.skip(skip).limit(limit)

    //returns the GET products 
    const products = await result
    res.status(200).json({products, nbHits: products.length}
    )
}

//exporting our modules
module.exports = {
    getAllProducts,
    getAllProductsStatic,
}