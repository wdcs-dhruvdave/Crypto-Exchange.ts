(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/walletapi.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addMoney": ()=>addMoney,
    "addToWallet": ()=>addToWallet,
    "createWallet": ()=>createWallet,
    "fetchUserWalletByToken": ()=>fetchUserWalletByToken,
    "fetchUserWallets": ()=>fetchUserWallets,
    "subtractFromWallet": ()=>subtractFromWallet,
    "updateWalletBalance": ()=>updateWalletBalance
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _process_env_NEXT_PUBLIC_WALLET_API_URL;
const BASE_URL = (_process_env_NEXT_PUBLIC_WALLET_API_URL = ("TURBOPACK compile-time value", "https://6875f832814c0dfa653a0c10.mockapi.io/Wallet")) !== null && _process_env_NEXT_PUBLIC_WALLET_API_URL !== void 0 ? _process_env_NEXT_PUBLIC_WALLET_API_URL : '';
if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_WALLET_API_URL is not defined');
}
async function fetchUserWallets(userId) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(BASE_URL, "?userId=").concat(userId));
        return res.data;
    } catch (error) {
        console.error('Error fetching wallets:', error);
        return [];
    }
}
async function createWallet(userId) {
    let token = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'USD', balance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    const newWallet = {
        userId,
        token,
        balance,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(BASE_URL, newWallet);
        return res.data;
    } catch (error) {
        console.error('❌ Failed to create wallet:', error);
        throw new Error('Wallet creation failed');
    }
}
async function fetchUserWalletByToken(userId, token) {
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("".concat(BASE_URL, "?userId=").concat(userId, "&token=").concat(token));
        return res.data[0] || null;
    } catch (error) {
        console.error('Error fetching wallet by token:', error);
        return null;
    }
}
async function addMoney(walletId, currentBalance, amount) {
    const updatedWallet = {
        balance: currentBalance + amount,
        updatedAt: new Date().toISOString()
    };
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put("".concat(BASE_URL, "/").concat(walletId), updatedWallet);
        console.log('🟢 Money added:', res.data);
        return res.data;
    } catch (err) {
        if (err instanceof Error) {
            console.error('❌ Error adding money:', err.message);
        } else {
            console.error('❌ Error adding money:', err);
        }
        throw new Error('Failed to add money');
    }
}
async function updateWalletBalance(walletId, newBalance) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put("".concat(BASE_URL, "/").concat(walletId), {
        balance: newBalance,
        updatedAt: new Date().toISOString()
    });
    return res.data;
}
async function addToWallet(walletId, currentBalance, amount) {
    const newBalance = currentBalance + amount;
    return updateWalletBalance(walletId, newBalance);
}
async function subtractFromWallet(walletId, currentBalance, amount) {
    const newBalance = currentBalance - amount;
    if (newBalance < 0) throw new Error('Insufficient balance');
    return updateWalletBalance(walletId, newBalance);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/auth.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getLoggedInUser": ()=>getLoggedInUser
});
function getLoggedInUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(main)/wallet/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>WalletPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$walletapi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/walletapi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function WalletPage() {
    _s();
    const [wallets, setWallets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usdWallet, setUsdWallet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletPage.useEffect": ()=>{
            const init = {
                "WalletPage.useEffect.init": async ()=>{
                    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLoggedInUser"])();
                    if (!user) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('User not logged in');
                        return;
                    }
                    setUserId(user.id);
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$walletapi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUserWallets"])(user.id);
                        if (data.length === 0) {
                            setLoading(false);
                            return;
                        }
                        const usd = data.find({
                            "WalletPage.useEffect.init.usd": (w)=>w.token === 'USD'
                        }["WalletPage.useEffect.init.usd"]);
                        setUsdWallet(usd || null);
                        setWallets(data);
                    } catch (err) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to load wallets');
                    } finally{
                        setLoading(false);
                    }
                }
            }["WalletPage.useEffect.init"];
            init();
        }
    }["WalletPage.useEffect"], []);
    const handleGenerateWallet = async ()=>{
        if (!userId) return;
        try {
            const newWallet = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$walletapi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWallet"])(userId, 'USD', 0);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('Wallet created');
            setUsdWallet(newWallet);
            setWallets([
                newWallet
            ]);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to create wallet');
        }
    };
    const handleAddMoney = async ()=>{
        if (!usdWallet || !amount) return;
        try {
            if (parseFloat(amount) <= 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Amount must be greater than 0');
                return;
            }
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$walletapi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMoney"])(usdWallet.id, usdWallet.balance, parseFloat(amount));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Added ".concat(amount, " to wallet"));
            setUsdWallet(updated);
            setWallets((prev)=>prev.map((w)=>w.id === updated.id ? updated : w));
            setAmount('');
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to add money');
        }
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 text-white",
        children: "Loading wallet..."
    }, void 0, false, {
        fileName: "[project]/app/(main)/wallet/page.tsx",
        lineNumber: 80,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 text-white max-w-md mx-auto space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: "My Wallet"
            }, void 0, false, {
                fileName: "[project]/app/(main)/wallet/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            !usdWallet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-300",
                        children: "You don't have a wallet yet."
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/wallet/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleGenerateWallet,
                        className: "px-4 py-2 bg-green-600 hover:bg-green-500 rounded",
                        children: "Generate Wallet"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/wallet/page.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/wallet/page.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this),
            usdWallet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold",
                            children: [
                                "Your Wallet Id : ",
                                usdWallet.id
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/wallet/page.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/wallet/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-800 p-4 rounded border border-gray-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-400",
                                children: "USD Balance"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/wallet/page.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-semibold",
                                children: [
                                    "$",
                                    usdWallet.balance.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/wallet/page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/wallet/page.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm text-gray-300",
                                children: "Add Money"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/wallet/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: amount,
                                        onChange: (e)=>setAmount(e.target.value),
                                        placeholder: "Amount in USD",
                                        className: "flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/wallet/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddMoney,
                                        className: "px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded",
                                        children: "Add"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/wallet/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/wallet/page.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/wallet/page.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            wallets.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold",
                        children: "Your Tokens"
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/wallet/page.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    wallets.filter((w)=>w.token !== 'USD').map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-800 p-3 rounded border border-gray-700 flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: w.token
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/wallet/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: w.balance.toFixed(6)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/wallet/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, w.id, true, {
                            fileName: "[project]/app/(main)/wallet/page.tsx",
                            lineNumber: 136,
                            columnNumber: 15
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/wallet/page.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/wallet/page.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(WalletPage, "9DYtgsIWQphJpGQvp7iQHyKTl+4=");
_c = WalletPage;
var _c;
__turbopack_context__.k.register(_c, "WalletPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_bc150fe5._.js.map