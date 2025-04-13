// swift-tools-version:5.5
import PackageDescription

let package = Package(
    name: "AppstentRNFramework",
    platforms: [
        .iOS(.v13)
    ],
    products: [
        .library(
            name: "AppstentRNFramework",
            targets: ["AppstentRNFramework"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "AppstentRNFramework",
            dependencies: []),
        .testTarget(
            name: "AppstentRNFrameworkTests",
            dependencies: ["AppstentRNFramework"])
    ]
)