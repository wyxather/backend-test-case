#pragma once

#include <ranges>
#include <string>
#include <vector>

namespace input_query {

[[nodiscard]] constexpr auto solve(
    const std::vector<std::string_view> &inputs,
    const std::vector<std::string_view> &queries
) noexcept -> auto {
    std::vector<std::size_t> result(queries.size());

    for ( const auto &[i, query] : queries | std::views::enumerate ) {
        for ( const auto &[j, input] : inputs | std::views::enumerate ) {
            if ( query.compare(input) == 0 ) {
                ++result[i];
            }
        }
    }

    return result;
}

[[nodiscard]] constexpr auto test(
    const std::vector<std::size_t> &s1,
    const std::vector<std::size_t> &s2
) noexcept -> bool {
    for ( const auto &[i1, i2] : std::views::zip(s1, s2) ) {
        if ( i1 != i2 ) {
            return false;
        }
    }
    return true;
}

static_assert(
    test(
        solve(
            std::vector<std::string_view> { "xc", "dz", "bbb", "dz" },
            std::vector<std::string_view> { "bbb", "ac", "dz" }
        ),
        { 1, 0, 2 }
    ),
    "input query has wrong answer"
);

}  // namespace input_query
