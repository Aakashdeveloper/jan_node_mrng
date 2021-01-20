const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema
} = graphql

const ProductType = new GraphQLObjectType({
    name:'Product',
    fields:{
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        language:{type:GraphQLString},
        rate:{type:GraphQLFloat},
        type:{type:GraphQLString},
        imageUrl:{type:GraphQLString}
    }
})
//get
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        Product:{
            type:ProductType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:8900/products/${args.id}`)
                .then((res) => res.data)
            }
        }
    }
})

//mutation
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addProducts:{
            type:ProductType,
            args:{
                id:{type:GraphQLInt},
                name:{type:GraphQLString},
                language:{type:GraphQLString},
                rate:{type:GraphQLFloat},
                type:{type:GraphQLString},
                imageUrl:{type:GraphQLString}
            },
            resolve(parentValue,{id,name,language,type,rate,imageUrl}){
                return axios.post(`http://localhost:8900/products`,{id,name,language,type,rate,imageUrl})
                .then((res) => res.data)
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})