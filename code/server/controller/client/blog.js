import blogModel from '../../models/blog'
import path from 'path'

module.exports = {
    async list(ctx, next) {
        console.log('----------------获取博客列表 client_demo_api/blog/list-----------------------');
        let { type = null, pageindex = 1, pagesize = 5 } = ctx.request.query;
        let conditions = {
            isVisible: true,
            source: 1
        };
        if (type) {
            conditions.type = type;
        }
        console.log('type:' + type + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)
        try {

            let data = await ctx.find(blogModel, conditions, null, {
                limit: pagesize * 1,
                skip: (pageindex - 1) * pagesize,
                sort: {
                    level: -1,
                    createTime: -1
                }
            });
            // let count = await ctx.count(blogModel);
            let count = await blogModel.aggregate([{
                $count: "totalCount"
            }]);

            return ctx.send(data, '', count)
        } catch (e) {
            console.log(e)
            return ctx.sendError(e)
        }

    },
    async info(ctx, next) {
        console.log('----------------获取博客信息 client_demo_api/blog/info-----------------------');
        let _id = ctx.request.query._id;
        try {
            let data = await ctx.findOne(blogModel, { _id });
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    }
}