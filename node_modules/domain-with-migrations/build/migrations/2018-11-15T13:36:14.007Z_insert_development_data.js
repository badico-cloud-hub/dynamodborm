
// migration of kind: undefined TODO: add recomendations on template
module.exports.up = function({ PaymentAccount }) {
    const paymentAccount = new PaymentAccount({
        customerId: 'cde44a25-01bf-4b4c-9114-9f013885b139',
        paymentMethodId: '582a9282-8473-487d-b609-e58e860759a2',
        bankCustomerCode: '62035',
        bankToken: '4223207580',
        bankAgency: '95',
        bankAccountNumber: '1053000',
        bankServiceBasket: '01',
        bankInclusionTime: '11:36:43',
        bankInclusionDate: 'Mon Oct 1',
        dueDate: '10',
    })

    return paymentAccount.save()
}

module.exports.down = function({Repository}) {
    return Repository.find().then((devDataList) => 
        Promise.all(devDataList.map(paymentAccount => paymentAccount.delete()))
    )
    
}
    