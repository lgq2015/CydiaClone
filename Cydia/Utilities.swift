//
//  Utilities.swift
//  Cydia
//
//  Created by Abraham Masri on 12/1/16.
//  Copyright © 2016 Abraham Masri. All rights reserved.
//

import Foundation
import UIKit

// Application name
let appName = "Cydia"

// Version of this Cydia
let cydiaVersion = "1.1.3"


func getDeviceModel () -> String {
    
    var sysinfo = utsname()
    uname(&sysinfo) // ignore return value
    return NSString(bytes: &sysinfo.machine, length: Int(_SYS_NAMELEN), encoding: String.Encoding.ascii.rawValue)! as String
}


func getSystemVersion () -> String {
    
    return UIDevice.current.systemVersion
    
}
