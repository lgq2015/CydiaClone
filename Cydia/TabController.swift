//
//  TabController.swift
//  Cydia
//
//  Created by ituser on 11/4/16.
//  Copyright © 2016 Abraham Masri. All rights reserved.
//

import UIKit
import Darwin
class TabView: UITabBarController {
    
    var redDot: UIView! = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        addRedDotAtTabBarItemIndex(index: 1)
        

        if (UserDefaults.standard.bool(forKey: "isjailbroken") == false) {
            
            UserDefaults.standard.set(true, forKey: "isjailbroken")
            var updatetimer = Timer.scheduledTimer(timeInterval: 0.4, target: self, selector: #selector(self.updatejailbroken), userInfo: nil, repeats: true);
            


        }
        
        var timer = Timer.scheduledTimer(timeInterval: 4.4, target: self, selector: #selector(self.update), userInfo: nil, repeats: true);
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // must be internal or public.
    func updatejailbroken() {

        exit(0)
        
    }
    
    
    // must be internal or public.
    func update() {
        redDot.isHidden = true
        
        tabBar.items?[2].badgeValue = "3"
        
    }
    
    func addRedDotAtTabBarItemIndex(index: Int) {
        

        let RedDotRadius: CGFloat = 8
        let RedDotDiameter = RedDotRadius * 2
        
        let TopMargin:CGFloat = 5
        
        let TabBarItemCount = CGFloat(tabBar.items!.count)
        
        let HalfItemWidth = view.bounds.width / (TabBarItemCount * 2)
        
        let  xOffset = HalfItemWidth * CGFloat(index * 2 + 1)
        
        let imageHalfWidth: CGFloat = (tabBar.items![index] as! UITabBarItem).selectedImage!.size.width / 2
        
        redDot = UIView(frame: CGRect(x: xOffset + imageHalfWidth, y: TopMargin, width: RedDotDiameter, height: RedDotDiameter))
        
        redDot.tag = 1314
        redDot.backgroundColor = UIColor.red
        redDot.layer.cornerRadius = RedDotRadius
        
        var activityIndicator = UIActivityIndicatorView()
        activityIndicator.activityIndicatorViewStyle = .whiteLarge
        activityIndicator.frame = CGRect(x: 1, y: 1, width: RedDotDiameter - 2, height: RedDotDiameter - 2)
        activityIndicator.startAnimating()
        activityIndicator.transform = CGAffineTransform(scaleX: 0.4, y: 0.4);
        redDot.addSubview(activityIndicator)
        
        tabBar.addSubview(redDot)
    }
    
    
}

