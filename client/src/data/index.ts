const statuses=[{
    status: "open",
    icon: "🔴",
    color: "red"
}, {
    status: "in progress",
    icon: "🟠",
    color: "orange"
}, {
    status: "in review",
    icon: "🟡",
    color: "yellow"
}, {
    status: "done",
    icon: "🟢",
    color: "green"
}];

const data=[{
    id:0,
    icon: "🔴",
    status: "open",
    title: "Zrobic rzecz 1",
    content: "No musze zrobic ją"
}, {
    id:1,
    icon: "🔴",
    status: "open",
    title: "Zrobic rzecz 2",
    content: "No musze zrobic ją totalnie tez"
}, {
    id:2,
    icon: "🟠",
    status: "in progress",
    title: "Zrobic rzecz 3",
    content: "O kurde ją tez musze zrobic"
},{
    id:3,
    icon: "🔴",
    status: "open",
    title: "Zrobic rzecz 4",
    content: "No musze zrobic ją tez ogólnie"
}
]

export {statuses, data};