import system from "@/views/System/";

/*
Author: eureka
Date: 2022-08-19 11:14:45
LastEditors: eureka
LastEditTime: 2022-09-05 15:04:25
 */
export default [

    {
        path: "/Layout",
        component: () => import("@/Main/index.vue"),
        meta: { title: "首页" },
        children: [
            {
                path: '/Layout/DownloadCenter',
                component: () => import('@/views/System/DownloadCenter'),
                meta: { title: 'DownloadCenter' },
                hidden: true
            },
            {
                path: "/Layout/BrandNewsHome",
                component: () => import("@/views/BrandNewsHome"),
                meta: { title: "Brand Insight" },
                name: "BrandNewsHome",
            },
            {
                path: "/Layout/BrandNews",
                component: () => import("@/views/BrandNewsHome/BrandNews"),
                meta: { title: "Brand Insight" },
                name: "BrandNews",
                hidden: true,
            },
            {
                path: "/Layout/Overview",
                component: () => import("@/views/DataIntelligence/Overview/"),
                meta: { title: "Social Intelligence" },
                name: "Overview",
            },
            {
                path: "/Layout/OriginData",
                component: () => import("@/views/OriginalData/"),
                meta: { title: "Social Buzz" },
                name: "OriginData",
            },

            {
                path: "/Layout/Report",
                component: () => import("@/views/DataIntelligence/Report/"),
                meta: { title: "Report" },
                hidden: true,
                children: [
                    {
                        path: "/Layout/Report/daysum",
                        component: () => import("@/views/DataIntelligence/Report/components/daysum.vue"),
                        meta: { title: "daysum" },
                        name: "daysum",
                        hidden: true,
                    },
                    {
                        path: "/Layout/Report/content",
                        component: () => import("@/views/DataIntelligence/Report/components/contenttag.vue"),
                        meta: { title: "content" },
                        hidden: true,
                        name: "content",
                    },
                ],
            },
            {
                path: "/System/brand",
                component: () => import("@/views/System/"),
                meta: { title: "System" },
                // hidden: true,
                children: [
                    {
                        path: '/Configuration',
                        component: () => import("@/views/System/Configuration/"),
                        meta: { title: 'Configuration', icon: 'icon-table' },
                        children: [
                            {
                                path: "/System/brand",
                                component: () =>
                                    import("@/views/System/Configuration/brandConfig/"),
                                meta: { title: "Brand", icon: 'icon-Brand' },
                            },
                            {
                                path: "/System/Industry",
                                component: () =>
                                    import("@/views/System/Configuration/IndustryConfig/"),
                                meta: { title: "Industry", icon: 'icon-building' },
                            },
                            {
                                path: "/System/KeyConfig",
                                component: () => import("@/views/System/Configuration/KeyConfig/"),
                                meta: { title: "Keyword", icon: 'icon-targat' },
                            },
                            {
                                path: "/System/Channel",
                                component: () => import("@/views/System/Configuration/channel/"),
                                meta: { title: "Channel", icon: 'icon-Channel' },
                            },
                            {
                                path: "/System/Platform",
                                component: () => import("@/views/System/Configuration/platform/"),
                                meta: { title: "Platform", icon: 'icon-platform' },
                            },
                            {
                                path: "/System/Topictag",
                                component: () => import("@/views/System/Configuration/TopicTag/"),
                                meta: { title: "Topic Tag", icon: 'icon-tag' },
                            },
                            {
                                path: "/System/Filter",
                                component: () => import("@/views/System/Configuration/Filter/"),
                                meta: { title: "Filter Word", icon: 'icon-filter' },
                            },
                        ]
                    },
                    {
                        path: '/Others',
                        component: () => import("@/views/System/Configuration/"),
                        meta: { title: 'Others', icon: 'icon-data-trend' },
                        children: [
                            {
                                path: "/System/NewReport",
                                component: () => import("@/views/System/Configuration/NewReport"),
                                meta: { title: "New Report",icon: 'icon-baogao-copy' },
                            },
                            {
                                path: "/Layout/BrandDiscovery",
                                component: () => import("@/views/BrandDiscovery"),
                                meta: { title: "Brand Discovery" ,icon:'icon-faxian' },
                            },
                        ]
                    },
                    {
                        path: '/Authority',
                        component: () => import("@/views/System/Authority/"),
                        meta: { title: 'Authority', icon:'icon-authoritymanagement' },
                        children: [
                            {
                                path: "/System/UserManagement",
                                component: () => import("@/views/System/Authority/User/user.vue"),
                                meta: { title: "User Management",icon:"icon-yonghuguanli" },
                            },
                            {
                                path: "/System/MenuManagement",
                                component: () => import("@/views/System/Authority/Menu/Menu.vue"),
                                meta: { title: "Menu Management",icon:'icon-caidan' },
                            },
                        ]
                    }

                ],
            },
        ],
    },

]
