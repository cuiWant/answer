/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (filterList, list) => {
    const mapping = filterList.reduce((pre, e)=>{
        pre[e] = true;
        return pre
    },{});
    
    return list.map((element)=>{
        return Object.keys(mapping).reduce((pre, attr) => {
            delete pre[attr];
            return pre
        },element)
    })
};
exports.excludeByProperty = (key, list) => {
    return list.filter((e) => {
        return !e[key]
    })
};
exports.sumDeep = (list) => {
    return list.map((e) => {
        e.objects = e.objects && e.objects.reduce((pre, element) => {
            pre += element.val ?? 0
            return pre
        }, 0)
        return e
    })
};
exports.applyStatusColor = (colorConfig, list) => {
    const colorMapping = Object.keys(colorConfig).reduce((pre, key) => {
        colorConfig[key].forEach((status) => {
            pre[status] = key;
        })
        return pre 
    }, {});
    return list.filter((e) => {
        const color = colorMapping[e.status];
        e.color = color;
        return color && e
    })
};
exports.createGreeting = (fn, catchGreeting) => {
    return (...values) => fn(catchGreeting, ...values)
};
exports.setDefaults = defaultAttr => data => Object.assign({ ...defaultAttr }, data)
exports.fetchUserByNameAndUsersCompany = (name, { fetchStatus, fetchUsers, fetchCompanyById }) => {
    const request = () => {
        return new Promise((resolve) => {
            fetchUsers().then((users) => {
                const user = users.find((e) => e.name === name);
                return fetchCompanyById(user.companyId).then( company => resolve({ user, company }))
            })
        })
    }
    return new Promise((resolve) => {
        Promise.all([fetchStatus().then(status=>({ status })), request()]).then((resList) => {
            resolve(resList.reduce((pre, e) => Object.assign(pre, e), {}))
        })
  }) 
};
