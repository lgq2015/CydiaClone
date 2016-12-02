//
//  FirstViewController.swift
//  Cydia
//
//  Created by ituser on 11/4/16.
//  Copyright © 2016 Abraham Masri. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController, UIWebViewDelegate {


    @IBOutlet weak var webView: UIWebView!

    @IBOutlet weak var loadingStack: UIStackView!
    
    @IBOutlet weak var reloadButton: UIBarButtonItem!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        var _ = Timer.scheduledTimer(timeInterval: 1.4, target: self, selector: #selector(self.update), userInfo: nil, repeats: false);
        
        webView.delegate = self
    
        // Properties
        webView.scrollView.contentInset = UIEdgeInsetsMake(70, 0, 50, 0);
        webView.backgroundColor = UIColor(red:0.94, green:0.94, blue:0.96, alpha:1.0)
        
        
    }
    
    // MARK: Functions
    
    // Loads the home page
    func loadHomepage () {
        
        // Get the local homepage file
        let htmlFile = Bundle.main.path (forResource:"homepage", ofType: "htm")
        var htmlString = try? String(contentsOfFile: htmlFile!, encoding: String.Encoding.utf8)
        
        // Set app name
        htmlString = htmlString?.replacingOccurrences(of: "to Cydia", with: "to \(appName)")
        
        // Add system info to the HTML String
        htmlString = htmlString?.replacingOccurrences(of: ", iOS 10", with: "\(getDeviceModel()), iOS \(getSystemVersion())")
        htmlString = htmlString?.replacingOccurrences(of: ", Cydia", with: ", Cydia \(cydiaVersion)")
        htmlString = htmlString?.replacingOccurrences(of: "UDID_REPLACE", with: UIDevice.current.identifierForVendor!.uuidString.lowercased().replacingOccurrences(of: "-", with: ""))
        
        webView.loadHTMLString(htmlString!, baseURL: nil)

        
        
    }
    
    

    // must be internal or public.
    func update() {
        
        loadHomepage()
        
        webView.isHidden = false
        loadingStack.isHidden = true
        
        reloadButton.tintColor = UIColor(red:0.00, green:0.48, blue:1.00, alpha:1.0)
    }
    
    
    // MARK: Delegates
    func webViewDidFinishLoad(_ webView: UIWebView) {
        webView.isHidden = false

    }
    
    
    @IBAction func aboutTapped (sender : AnyObject) {
        
        
        
        let alert = UIAlertController(title: "About Cydia Installer", message: "Copyright © 2008-2016", preferredStyle: UIAlertControllerStyle.alert)
        alert.addAction(UIAlertAction(title: "Close", style: UIAlertActionStyle.default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }



}

