#pragma once

#include <iostream>

namespace matrix {

[[nodiscard]] auto solve() noexcept -> auto {
    std::size_t n;
    std::cin >> n;

    std::vector<std::vector<std::size_t>> m(n);
    for ( auto &v : m ) {
        v = std::move(std::vector<std::size_t>(n));
        for ( auto &i : v ) {
            std::cin >> i;
        }
    }

    std::size_t d1 = 0;
    for ( std::size_t i = 0; i < n; ++i ) {
        d1 += m[i][i];
    }

    std::size_t d2 = 0;
    for ( std::size_t i = 0; i < n; ++i ) {
        d2 += m[i][n - 1 - i];
    }

    return d1 - d2;
}

}  // namespace matrix
