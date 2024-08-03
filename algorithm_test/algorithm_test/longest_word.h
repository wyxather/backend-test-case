#pragma once

#include <string_view>

namespace longest_word {

[[nodiscard]] constexpr auto solve(std::string_view s) noexcept -> auto {
    constexpr auto delimiter = ' ';

    std::string_view result;

    for ( std::size_t i = s.find(delimiter); i != std::string_view::npos;
          s = s.substr(i + 1), i = s.find(delimiter) ) {
        if ( const auto word = s.substr(0, i); word.length() > result.length() ) {
            result = word;
        }
    }

    if ( const auto word = s.substr(0); word.length() > result.length() ) {
        result = word;
    }

    return result;
}

[[nodiscard]] constexpr auto test(const std::string_view s1, const std::string_view s2) noexcept -> bool {
    return s1.compare(s2) == 0;
}

static_assert(test(solve("  Saya"), "Saya"), "longest word wrong answer");
static_assert(test(solve("Saya"), "Saya"), "longest word wrong answer");
static_assert(test(solve("Saya  "), "Saya"), "longest word wrong answer");
static_assert(test(solve("  Saya sangat senang mengerjakan soal algoritma"), "mengerjakan"), "longest word wrong answer");
static_assert(test(solve(" Saya  sangat  senang   mengerjakan soal algoritma  "), "mengerjakan"), "longest word wrong answer");
static_assert(test(solve("Saya  sangat senang mengerjakan    soal algoritma "), "mengerjakan"), "longest word wrong answer");
static_assert(test(solve("Saya  sangat   senang  mengerjakan soal   mengerjakan1"), "mengerjakan1"), "longest word wrong answer");
static_assert(test(solve("Saya sangat senang mengerjakan soal mengerjakan"), "mengerjakan"), "longest word wrong answer");

}  // namespace longest_word
