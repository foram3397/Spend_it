import { colors } from "../theme";

const incomeCategoryDataArray = [
    {
        name: 'Housing',
        color: colors.lightVoilet,
        subTypes: ['Mortage or rent', 'Property taxes', 'Household repairs']
    },
    {
        name: 'Transportation',
        color: colors.lightBlue,
        subTypes: ['Car payment', 'Car warranty', 'Gas', 'Tires']
    },
    {
        name: 'Food',
        color: colors.lightBlue,
        subTypes: ['Groceries', 'Restaurants', 'Pet food']
    },
    {
        name: 'Clothing',
        color: colors.lightOrange,
        subTypes: [`Adult's clothing`, `Children's clothing`, `Adult's shoes`, `Children's shoes`]
    },
    {
        name: 'Medical',
        color: colors.lightYellow,
        subTypes: ['Primary care', 'Dental care', 'Urgent care', 'Medications', 'Medical devices']
    },
    {
        name: 'Insurance',
        color: colors.lightGrey,
        subTypes: ['Health insurance', `Homeowner's or Renter's insurance`, 'Home warranty or Protection plan', 'Auto insurance', 'Life insurance', 'Disability insurance']
    },
    {
        name: 'Personal',
        color: colors.lightVoilet,
        subTypes: ['Gym membership', 'Haircuts', 'Salon services', 'Cosmetics', 'Babysitter']
    },
    {
        name: 'Debt',
        color: colors.lightGreen,
        subTypes: ['Personal loans', 'Student loans', 'Credit cards']
    },
    {
        name: 'Education',
        color: colors.lightYellow,
        subTypes: [`Children's college`, 'Your college', 'School Supplies', 'Books']
    },
    {
        name: 'Savings',
        color: colors.lightBlue,
        subTypes: ['Emergency Fund', 'Big purchases like a new mattress or laptop', 'Other savings']
    },
    {
        name: 'Gifts',
        color: colors.lightVoilet,
        subTypes: ['Birthday', 'Anniversary', 'Wedding', 'Christmas', 'Special occasion', 'Charities']
    },
    {
        name: 'Entertainment',
        color: colors.lightOrange,
        subTypes: ['Games', 'Movies', 'Concerts', 'Vacations', 'Subscriptions(Netflix, Amazon, etc.)']
    },
];

export default incomeCategoryDataArray;