const path = require(`path`)

exports.createPages =async ({actions, graphql})=>{
    const {data} = await graphql(`
        query MyQuery{
            Lollies{
                getAllLollies{
                    lollyPath
                }
            }
         }

    `)
    console.log("from nodejs", data)
    data.Lollies.getAllLollies.forEach(({lollyPath})=>{
        actions.createPage({
            path:`lollies/${lollyPath}`,
            component: path.resolve(`./src/components/Template.js`),
            context:{
                lollyPath,
            }
        })
    })
}