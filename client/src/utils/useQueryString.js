const { useLocation } = require("react-router");

export default function useQueryString() {
    return new URLSearchParams(useLocation().search)
}