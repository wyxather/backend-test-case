#pragma once

#include <concepts>
#include <ranges>

namespace reversed_except_last_numeric {

[[nodiscard]] consteval auto solve() noexcept -> auto {
    constexpr std::string_view str { "NEGIE1" };

    std::array<char, 6> reversed_str {};

    reversed_str[str.size() - 1] = str.back();

    for ( const auto &[i, c] : str | std::views::reverse | std::views::drop(1)
              | std::views::enumerate ) {
        reversed_str[i] = c;
    }

    return reversed_str;
}

[[nodiscard]] constexpr auto solve(const std::string_view s) noexcept -> std::string {
    std::string result(s.size(), 0);

    const auto populate_numeric = [&]() constexpr noexcept {
        constexpr auto is_digit = [](const std::integral auto c) constexpr noexcept -> bool {
            return '0' <= c && c <= '9';
        };

        for ( const auto &[i, c] : s | std::views::enumerate | std::views::reverse ) {
            if ( !is_digit(c) ) {
                return i;
            }
            result[i] = c;
        }
    };

    const auto first_alphabet_from_end_index = populate_numeric();

    const auto populate_reversed_alphabet = [&]() constexpr noexcept {
        const auto last_s_index = s.size() - 1;

        for ( const auto &[i, c] : s | std::views::reverse
                  | std::views::drop(last_s_index - first_alphabet_from_end_index)
                  | std::views::enumerate ) {
            result[i] = c;
        }
    };
    populate_reversed_alphabet();

    return result;
}

[[nodiscard]] constexpr auto test(const std::string_view s1, const std::string_view s2) noexcept -> bool {
    return s1.compare(s2) == 0;
}

static_assert(test(std::string_view { solve() }, "EIGEN1"), "reversed has wrong answer");
static_assert(test(solve("NEGIE1"), "EIGEN1"), "reversed has wrong answer");
static_assert(test(solve("NEGIE12"), "EIGEN12"), "reversed has wrong answer");
static_assert(test(solve("NEGIE1A1"), "A1EIGEN1"), "reversed has wrong answer");

}  // namespace reversed_except_last_numeric
